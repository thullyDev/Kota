<script setup lang="ts">
    import IngredientCard from "./IngredientCard.vue"   
</script>

<template>
    <div class="ingredients-con">
        <div class="label-con">
            <span class="main-text">
                Add Ingredients
            </span>
            <span class="sec-text">
                <p>At Least one</p>
            </span>
        </div>
        <div class="list-con">
            <span class="inp">
                <span class="inner-con">
                    <form action="POST">
                    <input type="text" name="ingredient" class="add-inp" placeholder="Add ingredient">
                    <button class="add-btn">
                        add
                    </button>
                    </form>
                </span>
            </span>
            <ul class="ing-list">
                <li class="ing-card" v-for="i in 10" :key="i">
                    <IngredientCard />
                </li>
            </ul>
        </div>
    </div>
</template>


