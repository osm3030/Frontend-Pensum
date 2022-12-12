<template>
    <h1>
        Nuevo semestre
    </h1>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="semester.name">
        </div>
        <div class="text-center">
            <button class="btn btn-outline-primary" @click="newSemester">Guardar</button> 
        </div>
    </form>
</template>
<script>
    export default {
        data(){
            return{
                semester: {
                    name: ""
                }
            }
        },
        methods:{
            async newSemester(e){
                e.preventDefault();
                const options = {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
                body:  JSON.stringify(this.semester)
            }
                const response = await fetch("http://127.0.0.1:8000/api/semester/store", options);
                const data = await response.json();
                this.$router.replace({path: '/semesters'});
            }
        }
        
    }
</script>
<style scoped>
    form{
        width: 400px;
        margin: 2em auto;
    }
    h1{
        font-family:sans-serif, 'Arial Narrow', Arial;
        text-align: center;
    }
</style>