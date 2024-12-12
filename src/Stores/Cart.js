import { defineStore } from "pinia";

import { ref } from "vue";


const useCartStore =defineStore("crat",()=>{
    const itemsArray =ref([])



    const addItems =(items)=>{
        cartItems.value.push(items)
    }
    return{itemsArray,addItems}
})
export {useCartStore}