import { ref } from "vue";
import { authRef } from "../firebase/config";

const user = ref(authRef.currentUser);

authRef.onAuthStateChanged(k=>{
    user.value = k
})


const getUser = () => {
    return {user}
}

export default getUser