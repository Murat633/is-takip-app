<template>
<div v-for="is in isler" :key="is.id">
    <router-link :to="{name:'isdetay',params:{id:is.id}}">
        <div class="single">
        <div class="thumbnail">
            <img :src="is.resimUrl">
        </div>
        <div class="info">
            <h3>{{ is.baslik }}</h3>
            <p>Oluşturan: {{ is.kullaniciAd }}</p>
        </div>
        <div class="work-number">
            <p>{{ is.isAdimlar.length }} Tane İş Adımı Bulunuyor.</p>
        </div>
    </div>
    </router-link>
</div>
</template>

<script>
export default {
    props:['isler']
}
</script>

<style>

</style>