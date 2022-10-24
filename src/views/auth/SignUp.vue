<template>
  <form @submit.prevent="handleSubmit">
    <h3>Kayıt Ol</h3>
    <input type="text" placeholder="Lütfen Kullanıcı Adınızı Giriniz." v-model="username" required>
    <input type="email" placeholder="Lütfen Email Adresini Giriniz." v-model="email" required>
    <input type="password" placeholder="Lütfen Parolanızı Giriniz." v-model="parola" required>
    <button type="submit">Kayıt Ol</button>
    <div v-if="hata" class="error">
        {{hata}}
    </div>
  </form>
</template>

<script>
import useSignUp from '../../composables/useSignUp'
import { ref } from 'vue';
export default {
    setup(){
        const {hata,signUp} = useSignUp()
        const username = ref('');
        const email = ref('');
        const parola = ref('');
        const handleSubmit = async() => {
            const res = await signUp(email.value,parola.value,username.value)
            router.push({name:'home'})
            if(!hata.value){
                console.log('Kullannıcı Üye Oldu')
            }
        }


        return {hata,email,parola,handleSubmit,username}

    }
}
</script>

<style>

</style>