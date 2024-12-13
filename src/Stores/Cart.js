import { defineStore } from "pinia";
import { ref, watch } from "vue";

const useCartStore = defineStore("cart", () => {
  const itemsArray = ref([]);

  const initializeStore = () => {
    const savedItems = localStorage.getItem("itemsArray");
    if (savedItems) {
      itemsArray.value = JSON.parse(savedItems);
    }
  };

  watch(
    itemsArray,
    (newValue) => {
      localStorage.setItem("itemsArray", JSON.stringify(newValue));
    },
    { deep: true }
  );

  const addItems = (item) => {
    itemsArray.value.push(item);
  };

  const editItem = (index, updatedItem) => {
    if (index > -1) {
      Object.assign(itemsArray.value[index], updatedItem);
    }
  };

  const deleteItem = (index) => {
    if (index > -1) {
      itemsArray.value.splice(index, 1);
    }
  };

  const uploadImage = (id, designUrl) => {
    const index = itemsArray.value.findIndex((item) => item.id === id);
    if (index > -1) {
      itemsArray.value[index].designUrl = designUrl;
    }
  };

  const addComposition = (itemId, composition) => {
    const item = itemsArray.value.find((item) => item.id === itemId);
    if (item) {
      item.Compositions = item.Compositions || [];
      item.Compositions.push(composition);
    }
  };

  const editComposition = (itemId, index, updatedComposition) => {
    const item = itemsArray.value.find((item) => item.id === itemId);
    if (item && item.Compositions && index > -1) {
      Object.assign(item.Compositions[index], updatedComposition);
    }
  };

  const deleteComposition = (itemId, index) => {
    const item = itemsArray.value.find((item) => item.id === itemId);
    if (item && item.Compositions && index > -1) {
      item.Compositions.splice(index, 1);
    }
  };

  return {
    itemsArray,
    addItems,
    editItem,
    deleteItem,
    initializeStore,
    uploadImage,
    addComposition,
    editComposition,
    deleteComposition,
  };
});

export { useCartStore };