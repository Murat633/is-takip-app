<template>
  <nav class="navbar">
    <img src="../assets/work.png">
    <h1>
        <router-link :to="{name:'home'}">İş Takip</router-link>
    </h1>
    <div class="links">
        <div v-if="user">
            <router-link :to="{name:'isolustur'}">İş Oluştur</router-link>
            <button @click="handleClick">Çıkış</button>
        </div>
        <div v-if="!user">
            <router-link class="btn" :to="{name:'register'}">Üye Ol</router-link>
            <router-link class="btn" :to="{name:'login'}">Giriş</router-link>
        </div>
    </div>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout';
import { useRouter } from 'vue-router';
import getUser from '../composables/getUser'
export default {
    setup(){
        const {logout} = useLogout()
        const router = useRouter()
        const {user} = getUser()
        const handleClick = async()=>{
            await logout()
            router.push({name:'login'})
        }

        return {handleClick,user}
    }
}
</script>

<style>

</style>