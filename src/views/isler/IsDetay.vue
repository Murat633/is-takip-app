<template>
<div v-if="hataDocument || hata" class="error">{{ hataDocument || hata }}</div>
<div v-if="is" class="work-details">
  <div class="work-info">
    <div class="image">
      <img :src="is.resimUrl" />
    </div>
      <h2 >{{ is.baslik }}</h2>
      <p class="username">{{ is.kullaniciAd }}</p>
      <p class="description">{{ is.aciklama }}</p>
  </div>
  <div class="work-list">
    <h2>iş Adımlar</h2>
    <IsAdimEkle v-if="kullaniciIs" :is="is" />
    <div class="work-list">
      <div v-if="!is.isAdimlar.length">Henüz İş Eklenmedi</div>
      <div v-for="isAdim in is.isAdimlar" :key="isAdim.id" class="single-work">
        <div class="details">
            <h3>{{isAdim.isAdimi}}</h3>
        </div>
        <button v-if="kullaniciIs" @click="handleClick(isAdim.id)" >Sil</button>
      </div>
    </div>
    <button v-if="kullaniciIs" @click="deleteWork">İşi Sil</button>
  </div>
</div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import getDocument from '../../composables/GetDocument';
import getUser from '../../composables/getUser';
import useStorage from '../../composables/useStorage';
import useDocument from '../../composables/useDocument'
import { useRouter } from 'vue-router';
import IsAdimEkle from '../../components/IsAdimEkle.vue';
export default {
    components:{IsAdimEkle},
    props:['id'],
    setup(props){
      const router = useRouter();
      const {belgeSil,belgeGuncelle,hata} = useDocument('isler',props.id);
      const {user} = getUser();
      const kullaniciIs = computed(()=>{
        return is.value && user.value && user.value.uid == is.value.kullaniciId
      })
      const {belge:is,hataDocument} = getDocument('isler',props.id)
      const {resimSil} = useStorage()

      const deleteWork = async()=>{
        await resimSil(is.value.fileYol)
        await belgeSil()
        router.push({name:'home'})
      }

      const handleClick = async(id)=>{
        const isAdimlar = is.value.isAdimlar.filter((adim)=>adim.id!=id)
        await belgeGuncelle({isAdimlar})
      }

      return {hataDocument,is,kullaniciIs,deleteWork,handleClick}
    }
}
</script>

<style>

</style>