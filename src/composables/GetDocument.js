import { ref } from "vue";
import { firestoreRef } from "../firebase/config";


const getDocument=(koleksiyon,id)=>{
    let belge = ref();
    let hataDocument=ref();

    let belgeRef = firestoreRef.collection(koleksiyon).doc(id)

    belgeRef.onSnapshot(doc=>{
        if(doc.data()){
            belge.value = {...doc.data(),id:doc.id}
        }else{
            hataDocument.value = "Belge Bulunamadı"
        }
    },err=>{
        hataDocument.value = 'VVeriye Erişilemedi'
    })

    return {hataDocument,belge}
}


export default getDocument