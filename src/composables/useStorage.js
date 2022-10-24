import { ref } from "vue";
import { storageRef } from "../firebase/config";
import getUser from './getUser'

const {user} = getUser();


const useStorage = ()=>{
    const hata = ref(null);
    const url= ref(null);
    const fileYol = ref(null);

    const resimYukle = async(file) =>{
        fileYol.value = `isler/${user.value.uid}/${file.name}`
        const storage = storageRef.ref(fileYol.value)

        try{
            const res = await storage.put(file)
            url.value = await res.ref.getDownloadURL()
        }catch(error){
            hata.value = error.message
        }
    }

    const resimSil = async(path) =>{
        const storage = storageRef.ref(path);
        
        try{
            await storage.delete()
        }catch(err){
            hata.value = err.message
        }
    }

    return {resimYukle,resimSil,url,fileYol,hata}
}

export default useStorage