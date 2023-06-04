<template>
    <section class="container d-flex align-center">
        <!-- Show loading screen -->
        <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
            <v-progress-circular color="red-darken-2" indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-row cols="12" justify="center" class="d-flex align-center">
            <v-col cols="12">
                <p class="text-center text-grey-darken-1 text-h6">Select your file</p>
            </v-col>
            <v-col cols="6">
                <form @submit="handleSendFile">
                    <v-file-input :rules="rules" clearable show-size counter @change="handleFileUpload" label="Select file"
                        v-model="selectedFile" accept=".xlsx, .xls" required></v-file-input>
                    <v-row justify="end" class="mt-2">
                        <v-col cols="auto">
                            <v-btn type="submit" color="red-darken-2">Add file</v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-col>
        </v-row>
        <!-- Modal shows error server -->
        <ModalComponent v-if="isErrorServer || isAuthenticated" :modal-title="'System message'" :modal-body="modalBody">
        </ModalComponent>
    </section>
</template>
<script>
import * as XLSX from 'xlsx';
import { apiAddFile } from "../api/xlsxFiles/apiAddFile";
import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
    components: {
        ModalComponent,
    },
    data() {

        return {
            selectedFile: null,
            excelRows: [],
            overlay: false,
            rules: [
                value => {
                    return !value || !value.length || value[0].size < 1000000 || 'Avatar size should be less than 2 MB!'
                },
            ],

            //Show modal with the error
            isErrorServer: false,
            isAuthenticated: false,
            modalTitle: "Signup successful",
            modalBody: "Server not available",
        }
    },
    methods: {
        readFile() {
            console.log(this.selectedFile)
            // const file = 'ruta/al/archivo.xlsx'; // Ruta a tu archivo XLSX

            // // Leer el archivo XLSX utilizando fs
            // const buffer = fs.readFileSync(file);

            // Convertir el archivo XLSX a un objeto JSON
            const workbook = XLSX.read(this.selectedFile, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            console.log(jsonData); // Hacer algo con los datos JSON

        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                // console.log(workbook)

                // Aquí llamamos a una función que convierte el archivo a JSON
                const jsonData = this.xlsxToJson(workbook);

                // Aquí puedes hacer lo que necesites con el JSON resultante
                //console.log(jsonData.Sheet1);

                //Create new object to send to DB
                const newJson = jsonData.Sheet1.map((el) => {
                    //console.log(el["User Name"])
                    let username = el["User Name"];
                    let userId = el["User ID"];
                    let punchIn = el["Punch In"];
                    let punchOut = el["Punch Out"];
                    let date = el.Date;

                    return {
                        username: username,
                        userId: userId,
                        date: date,
                        punchIn: punchIn,
                        punchOut: punchOut
                    }
                });

                //console.log(newJson)
                this.excelRows = newJson;
            };

            reader.readAsArrayBuffer(file);
        },
        xlsxToJson(workbook) {
            const result = {};
            workbook.SheetNames.forEach((sheetName) => {
                const worksheet = workbook.Sheets[sheetName];
                // const worksheetClean = worksheet.shift();
                //console.log(worksheet)
                const array = Object.values(worksheet).map(obj => obj);
                //console.log(array)
                //Take off the first element of the array wich is not a valid object to iterate
                const cleanArray = array.shift();
                //console.log(worksheet)

                //Check attribute v of array and if "V" is a number replace it with the original data in "W" attrinbute
                const newArr = array.map((el, ix) => {
                    // console.log(el.v)
                    if (typeof (el.v) === "number") {
                        // console.log(el.v)
                        // console.log(el.w)
                        // console.log('*******')
                        el.v = el.w;
                    }
                });

                //array.map modify original array so dont need to pass newArr to this
                result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
            });
            return result;
        },

        async handleSendFile(e) {
            try {
                e.preventDefault();
                const file = JSON.parse(JSON.stringify(this.excelRows));
                this.overlay = true;

                const response = await apiAddFile(file);
                this.overlay = false;
                console.log(response)

                //If server is not receiving requests
                if (response.isServerAvailable === false) {
                    // console.log('Server not available');
                    this.modalBody = response.serverMessage;
                    this.isErrorServer = true;
                    return;
                }

                if (response.data.isSuccessful) {
                    console.log('se registro');
                    
                    this.$router.push('/tableRegisters');

                } else {
                    this.modalBody = response.data.message;
                    this.isErrorServer = true;
                    return;
                }

            } catch (error) {
                console.error(error);
            }
        }

    }
}
</script>
  