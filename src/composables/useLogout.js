import { ref } from "vue";
import { authRef } from "../firebase/config";

const hata = ref(null);


const logout = async()=>{
    hata.value = null;
    try{
        await authRef.signOut()
    }catch(error){
        hata.value = err.message
    }
}



const useLogout = ()=>{
    return {hata,logout}
}

export default useLogout