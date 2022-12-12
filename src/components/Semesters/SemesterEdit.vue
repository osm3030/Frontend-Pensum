<template>
    <h1>
        Editar semestre
    </h1>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="semester.name">
        </div>
        <button class="btn btn-outline-success" @click="updateSemester">Guardar</button> 
    </form>

</template>

<script>
    export default {
        props:['id'],
        async created(){
            const options = {
                method: "GET",                
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
            const response = await fetch("http://127.0.0.1:8000/api/semester/" + this.id, options);
            const data = await response.json();
            let editSemesterData = {
                name: data.data.name
            }
            this.semester = editSemesterData;
        },
        data(){
            return{
                semester:  []
            }
        },
        methods:{
            async updateSemester(e){
                e.preventDefault();
                const options = {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
                body:  JSON.stringify(this.semester)
            }
                const response = await fetch("http://127.0.0.1:8000/api/semester/"+ this.id +"/update", options);
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