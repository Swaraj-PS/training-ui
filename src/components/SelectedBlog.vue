<template>
        <div>
        <div>{{blog.username}}</div>
        <div>{{blog.createdAt}}</div>
            <h1>{{blog.title}}</h1>
            <div>{{blog.description}}</div>
    </div>
</template>

<script>



export default {
    name: 'SelectedBlog',
    props :  {
        blog:{
            type :Object,
        }

    },
};
</script>