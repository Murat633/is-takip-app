import { ref } from "vue";
import { firestoreRef } from "../firebase/config";


const useDocument = (koleksiyon,id) => {
    const hata = ref(null);

    let belgeRef = firestoreRef.collection(koleksiyon).doc(id)

    const belgeSil = async () =>{
        hata.value = null;

        try{
            const res = await belgeRef.delete()
            return res
        } catch(error){
            hata.value = "belge Silinemedi"
        }        
    }   
    
    const belgeGuncelle = async(isAdimlar)=>{
        hata.value = null
        try{
            const res = await belgeRef.update(isAdimlar)
        }catch(err){
            hata.value = "Belge Güncellenemedi"
        }
    }

    return {hata,belgeSil,belgeGuncelle}
}

export default useDocument