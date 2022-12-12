<template>
   <h1>
        Asignaturas
        <router-link :to="'/subjects/create'" v-if="rol">
            <button class="btn btn-outline-success" >
                <i className="fa-solid fa-plus"></i>    
            </button>
        </router-link>
    </h1>

    <table class="table table-hover align-middle">
        <thead>
            <th>#</th>
            <th>Nombre</th>
            <th>Créditos</th>
            <th>Prerequisitos de Aisgnaturas</th>           
            <th>Acciones</th>
        </thead>
        <tbody>
            <tr v-for="subjects in subjects" :key="subjects.id">
                <td>{{ subjects.id }}</td>
                <td>{{ subjects.name }}</td>
                <td>{{ subjects.credits }}</td>
                <td>{{ subjects.subject_prerequisite }}</td>
                <td>
                    <button class="btn btn-outline-info" @click="subjectInfo(subjects.id)" data-bs-toggle="modal" data-bs-target="#subjectModal">
                        <i className="fa-regular fa-eye"></i>
                    </button>
                    <router-link :to="'/subjects/' + subjects.id + '/edit'" v-if="rol">
                        <button class="btn btn-outline-primary">
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </router-link>
                    <button class="btn btn-outline-danger" href="javascript:void(0)" @click="deleteSubject(subjects.id)" v-if="rol">
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="modal fade" id="subjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h2 class="modal-title fs-5" id="exampleModalLabel">Información de la Asignatura</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="h5">Nombre:</label>
                            <p for="name"  class="h6">{{ subject.name }}</p>
                        </div>
                        <div class="mb-3">
                            <label for="credits" class="h5">Créditos:</label>
                            <p for="name"  class="h6">{{ subject.credits }}</p>
                        </div>
                        <div class="mb-3">
                            <label for="subject_prerequisite" class="h5">Prerequisitos Asignaturas:</label>
                            <p for="name"  class="h6">{{ subject.subject_prerequisite }}</p>
                        </div>
                        <div class="mb-3">
                            <label for="autonomous_hours" class="h5">Horas Autónomas:</label>
                            <p for="name"  class="h6">{{ subject.autonomous_hours }}</p>
                        </div>
                        <div class="mb-3">
                            <label for="directed_hours" class="h5">Horas Dirigidas:</label>
                            <p for="name"  class="h6">{{ subject.directed_hours }}</p>
                        </div>
                        <div class="mb-3">
                            <label for="semesterName" class="h5">Semestre:</label>
                            <p for="name"  class="h6">{{ subject.semesterName }}</p>
                        </div>
                    </form>  
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>


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
            const response = await fetch("http://localhost:8000/api/subject/" +  this.id + "/semester", options);
            const data = await response.json();
            //console.log(data);
            this.subjects = data.data;
        },
        data(){
            return{
                subjects: [],
                subject: [],
                rol: this.evaluateRol()
            }
        },
       methods:{
            async deleteSubject(id){
                //console.log(id);
                const options = {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
                const response = await fetch("http://localhost:8000/api/subject/"+ id +"/destroy", options);
                const data = await response.json();
                // console.log(data.data.newList);
                this.subjectsAll();           
            },
            async subjectsAll(id){
            const options = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
            const response = await fetch("http://localhost:8000/api/subject/" + this.id + "/semester", options);
            const data = await response.json();
            //console.log(data);
            this.subjects = data.data;
            },
            async subjectInfo(id){
                //console.log(id);
                const options = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
                const response = await fetch("http://localhost:8000/api/subject/"+ id, options);
                const data = await response.json();
                // console.log(data.data.newList);
                this.subject = data.data;           
            },

            evaluateRol(){

                this.rol = localStorage.getItem('rol')

                if( this.rol == 1){
                    return true
                }else{
                    return false
                }
            }
       }
    }   
</script>
<style scoped>
    button{
        margin: 1%
    }
    h1{
        font-family:sans-serif, 'Arial Narrow', Arial;
        text-align: center;
    }
    h2{
        font-family:sans-serif, 'Arial Narrow', Arial;
        text-align: center; 
    }
</style>