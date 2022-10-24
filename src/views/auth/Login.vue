<template>
  <form @submit.prevent="handleSubmit">
    <h3>Giriş Yap</h3>
    <input type="email" placeholder="Lütfen Email Adresini Giriniz." v-model="email" required>
    <input type="password" placeholder="Lütfen Parolanızı Giriniz." v-model="parola" required>
    <button type="submit">Giriş</button>
    <div v-if="hata" class="error">
        {{hata}}
    </div>
  </form>
</template>

<script>
import useLogin from '../../composables/useLogin'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const {hata,login} = useLogin()
        const email = ref('');
        const parola = ref('');
        const router = useRouter();
        const handleSubmit = async() => {
            const res = await login(email.value,parola.value)
            router.push({name:'home'})
            if(!hata.value){
                console.log('Kullanıcı Giriş Yaptı')
            }
        }


        return {hata,email,parola,handleSubmit}

    }
}
</script>

<style>

</style>