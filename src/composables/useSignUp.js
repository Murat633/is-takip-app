import { ref } from "vue";
import {authRef} from '../firebase/config';


const hata = ref(null)

const signUp = async (email,password,username)=>{
    hata.value = null;

    try{
        const res = await authRef.createUserWithEmailAndPassword(email,password)
        
        if(!res){throw new Error('Üye Olma İşlemi Gerçekleşmedi')}

        await res.user.updateProfile({displayName:username})

        hata.value = null;
        return res
    }catch(error){
        hata.value = error.message;
    }
}


const useSignUp = ()=>{
    return {hata,signUp}
}

export default useSignUp