<template>
  <mdb-container>
    <div class="row justify-content-center">
      <mdb-col md="10">
        <!-- <p class="h4 text-center mb-4">Datos de Envío</p> -->
        <div class="card">
          <div class="card-body">
            <form action="#" @submit.prevent="submit">
                <p class="h5 text-left mb-1">Información Personal</p>
                <div class="text-left">
                    <mdb-row> 
                        <mdb-col>
                            <mdb-input 
                                label="Nombre" 
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                        <mdb-col>
                            <mdb-input 
                                label="Apellido Paterno"  
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                        <mdb-col>
                            <mdb-input 
                                label="Apellido Materno"
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                    </mdb-row>
                    <mdb-row> 
                        <mdb-col>
                            <mdb-input 
                                label="Telefono Celular" 
                                size="sm"
                                type="phone"
                                required
                            />
                        </mdb-col>
                        <mdb-col>
                            <mdb-input 
                                label="Correo Electrónico" 
                                size="sm"
                                type="email"
                                required
                            />
                        </mdb-col>
                    </mdb-row>
                    <p class="h5 text-left mb-1">Datos de Envío</p>
                    <mdb-row> 
                      <mdb-col>
                            <mdb-input 
                                label="Dirección" 
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                    </mdb-row>
                    <mdb-row> 
                        <mdb-col>
                            <mdb-input 
                                label="No. Interior" 
                                size="sm"
                                type="text"
                            />
                        </mdb-col>
                        <mdb-col>
                            <mdb-input 
                                label="No. Exterior"  
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                    </mdb-row>
                    <mdb-row> 
                     <mdb-col>
                            <mdb-input 
                                label="Ciudad"
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                        <mdb-col>
                            <mdb-input 
                                label="Estado" 
                                size="sm"
                                type="text"
                            />
                        </mdb-col>
                    </mdb-row>
                     <mdb-row>
                        <mdb-col>
                            <mdb-input 
                                label="Municipio"  
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                        <mdb-col>
                            <mdb-input 
                                label="Código Postal"  
                                size="sm"
                                type="number"
                                required
                            />
                        </mdb-col>
                    </mdb-row>
                    <mdb-row>
                        <mdb-col>
                            <mdb-input 
                                label="Comentarios y/o Referencias"  
                                size="sm"
                                type="text"
                                required
                            />
                        </mdb-col>
                    </mdb-row>
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <mdb-btn type="submit">Seleccionar Método de Pago</mdb-btn>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </mdb-col>
    </div>
    <br><br>
  </mdb-container>
</template>