import { ref } from "vue";
import {authRef} from '../firebase/config';


const hata = ref(null)

const login = async (email,password)=>{
    hata.value = null;

    try{
        const res = await authRef.signInWithEmailAndPassword(email,password)

        hata.value = null;
        return res
    }catch(eroor){
        hata.value = 'login işlemi gerçekleşmedi';
    }
}


const useLogin = ()=>{
    return {hata,login}
}

export default useLogin