<script setup lang="ts">
    import IngredientCard from "./IngredientCard.vue"   
    import DishInp from "../components/DishInp.vue"
</script>

<template>
    <div class="ingredients-con flex flex-col gap-5">
        <div class="label-con">
            <span class="main-text text-xl font-bold flex justify-center">
                Add Ingredients
            </span>
            <span class="sec-text text-sm flex justify-center">
                <p>At Least one</p>
            </span>
        </div>
        <div class="list-con">
            <span class="inp">
                <span class="inner-con">
                    <form action="POST" class="flex flex-col items-center">
                        <DishInp name="name" icon="fa fa-tag" />
                        <span class="quan-add flex justify-center py-5">
                            <div class="border border-neutral-400 flex flex-nowrap gap-3 py-1 px-2 bg-neutral-700 rounded-l justify-center">
                              <Icon name="fa fa-plus-circle text-neutral-400 text-sm" />
                              <input type="number" id="quantity" name="quantity" class="bg-inherit text-white text-xs border-none outline-none placeholder:text-neutral-400" placeholder="quantity" min="1" max="100" />
                            </div>
                            <button class="add-btn bg-yellow-500 w-16 rounded-r text-sm">
                                add
                            </button>
                        </span>
                    </form>
                </span>
            </span>
            <ul class="ing-list flex flex-wrap gap-2 justify-center">
                <li class="ing-card w-full max-w-64" v-for="i in 10" :key="i">
                    <IngredientCard />
                </li>
            </ul>
        </div>
    </div>
</template>


