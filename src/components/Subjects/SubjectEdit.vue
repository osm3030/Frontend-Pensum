<template>
    <h1>
       Editar Asignatura
   </h1>
   <form>
       <div class="mb-3">
           <label for="name" class="form-label">Nombre</label>
           <input type="text" class="form-control" id="name" v-model="subject.name">
       </div>
       <div class="mb-3">
           <label for="credits" class="form-label">Créditos</label>
           <input type="text" class="form-control" id="credits" v-model="subject.credits">
       </div>
       <div class="mb-3">
           <label for="subject_prerequisite" class="form-label">Prerequisitos Asignaturas</label>
           <input type="text" class="form-control" id="subject_prerequisite" v-model="subject.subject_prerequisite">
       </div>
       <div class="mb-3">
           <label for="autonomous_hours" class="form-label">Horas Autónomas</label>
           <input type="text" class="form-control" id="autonomous_hours" v-model="subject.autonomous_hours">
       </div>
       <div class="mb-3">
           <label for="directed_hours" class="form-label">Horas Dirigidas</label>
           <input type="text" class="form-control" id="directed_hours" v-model="subject.directed_hours">
       </div>
       <div class="mb-3">
           <label for="semester_id" class="form-label">Semestre</label>
           <select class="form-select" aria-label="Default select example" v-model="subject.semester_id">
           <option value="" selected>Seleccionar un semestre</option>
           <option v-for="semester in this.semesters" v-bind:value="semester.id"> {{ semester.name }} </option>
           </select>
       </div>
       <button class="btn btn-outline-success" @click="updateSubject">Guardar</button> 
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
            const response = await fetch("http://127.0.0.1:8000/api/subject/" + this.id, options);
            const response3 = await fetch("http://localhost:8000/api/semester", options);
            const response2 = await fetch("http://localhost:8000/api/user", options);
            const data3 = await response3.json();
            const data2 = await response2.json();
            const data = await response.json();
            // console.log(data);
            let editSubjectData = {
                name: data.data.name,
                credits: data.data.credits,
                subject_prerequisite: data.data.subject_prerequisite,
                autonomous_hours: data.data.autonomous_hours,
                directed_hours: data.data.directed_hours,
                semester_id: data.data.semester_id,
                semesterName: data.data.semesterName,
                user_id: data.data.user_id,
                userName: data.data.userName
            }
            this.subject = editSubjectData;
            this.semesters = data3.data;
            this.users = data2.data;
        },
        data(){
            return{
                subject:  [],
                semesters: [],
                users: []
            }
        },
        methods:{
            async updateSubject(e){
                e.preventDefault();
                const options = {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
                body:  JSON.stringify(this.subject)
            }
                const response = await fetch("http://127.0.0.1:8000/api/subject/"+ this.id +"/update", options);
                const data = await response.json();
                // console.log(data);
                this.$router.replace({path: '/subjects/' + this.subject.semester_id + '/semester'});
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