<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <h4>İş Oluştur.</h4>
        <input type="text" placeholder="İş Başlık" v-model="baslik">
        <textarea cols="30" rows="10" placeholder="İş Açıklama" v-model="aciklama"></textarea>
        <label>İş Logo</label>
        <input type="file" @change="handleChange">
        <input type="datetime-local" v-model="basTarih">
        <div class="error">
            {{ fileHata }}
        </div>
        <button>İş Oluştur</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useStorege from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser';
import { tarih } from '../../firebase/config';
import { useRouter } from 'vue-router';
export default {
setup(){
    //Router
    const router = useRouter();
    // İş Takip Oluşturma Bilgileri
    const baslik = ref('');
    const aciklama = ref('');
    const basTarih = ref('');
    // Geçerli Resim Tipleri
    const gecerliTipler = ['image/png','image/jpeg'];
    // dosya Yükleme ve Form Submit İşlemler
    const file = ref(null);
    const fileHata = ref(null);

    const {resimYukle,url,fileYol,hata} = useStorege();
    const {hataCollection,belgeEkle} = useCollection('isler');
    const {user} = getUser();

    const handleSubmit = async()=>{
        if(file.value){
            await resimYukle(file.value)
            console.log('resim yüklendi',url.value)
            const res = await belgeEkle({
                baslik:baslik.value,
                aciklama:aciklama.value,
                kullaniciId:user.value.uid,
                kullaniciAd:user.value.displayName,
                resimUrl:url.value,
                fileYol:fileYol.value,
                isAdimlar:[],
                isTarih:Date.parse(basTarih.value),
                olusturulmaTarihi:tarih
            })

            if(!hataCollection.value){
                //console.log("is Eklendi")
                router.push({name:'isdetay',params:{id:res.id}})
            }
        }
    }
    const handleChange = (e) =>{
        let secilen = e.target.files[0]
        
        if(secilen && gecerliTipler.includes(secilen.type)){
            file.value = secilen;
            fileHata.value = null;
        }else {
            file.value = null;
            fileHata.value = "Lütfen .PNG ya da .JPEG Uzantılı Dosyalar Seçiniz"
        }
    }
    return {baslik,aciklama,basTarih,handleSubmit,handleChange,fileHata}
}
}
</script>

<style>
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label{
        font-size: 17px;
        display: block;
        margin-top: 30px;
    }

    form{
        margin-top: -30px;
    }
</style>