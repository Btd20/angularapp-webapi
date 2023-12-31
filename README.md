 # DOCUMENTACIÓ TÉCNICA
<a href="#1-introducci%C3%B3">1. Introducció.</a><br>
<a href="#2-arquitectura">2. Arquitectura.</a><br>
<a href="#3-components-dangular">3. Components d'Angular.</a><br>
<a href="#4-backend-i-bbdd">4. Backend i BBDD.</a><br>
<a href="#5-configuració-i-requisits">5. Configuració i requisits.</a><br>
<a href="#6-us-i-exemples">6. Us i exemples.</a><br>
<a href="#7-proves">7. Proves.</a><br>
<a href="#8-desplegament">8. Desplegament.</a><br>
<a href="#9-manteniment">9. Manteniment.</a><br>
<a href="#10-referencies">10. Referencies.</a><br>
<a href="#11-anexos">11. Anexos.</a> <!--si es necessari-->
<br>
## 1. Introducció:
El projecte s'ha desenvolupat per tal de que els treballadors de l'empresa ACME puguin reservar sales amb la finalitat de reunir-se amb altres treballadors de l'empresa, concretant dia i hora d'inici. Així doncs, el usuari pot reservar la sala desitjada i a la vegada, també pot veure a quines hores la sala no està disponible.<br><br>El projecte ha sigut desenvolupat amb les següents tecnologies: AspNet.Core, C#, SQL Server i el framework Angular, de les que parlarem més endavant.<br><br>Els objectius del projecte s'han anat afegint en el Trello, progressivament. En les primeres setmanes del projecte, els objectius no eren altres que crear el projecte i conseguir objectius petits, com per exemple: que un usuari es pogués registrar i això es guardes correctament a la BBDD. Durant la duració del propi projecte, els objectius han anat agafant més ambició. Un bon exemple seria la imatge del perfil. Un cop creat el perfil, vam veure que els usuaris de l'empresa necessitaven afegir la seva imatge de perfil i per això vam investigar com es tractava una imatge a la BBDD, per llavors passar-la al component adient, en aquest cas profile.component.ts.
<br><br>
## 2. Arquitectura:
En aquest apartat entrarem en detall en quant a la arquitectura a capes, utilitzada per desenvolupar el projecte. També parlarem amb més profunditat en les tecnologies utilitzades, anomenades en el apartat anterior. 

### 2.1 Arquitectura a Capes:
Hem seguit aquesta arquitectura tant per el projecte com per organitzar-nos de la millor manera possible. Dintre del projecte, les capes s'han separat de la següent manera:
<br>
#### 2.1.1 Capa de presentació (Frontend):
 - El frontend s’ha portat a terme gràcies a la tecnología anomenada **Angular**, basada en una altre, anomenada **Typescript**. Les dues tecnologies han aportat al projecte una interacció per l’usuari. Typescript ha servit per desenvolupar la lògica del interfaz d'usuari i en canvi, l'Angular s'ha encarregat de la construcció de la interfície d'usuari i de la interacció. 
 - En la part més pura de fulls d’estils, s’ha utilitzat **HTML i CSS**, tot i que recordem que això no es considera com a tal una tecnología, simplement defineixen les seccions de la pàgina a més dels estils. 
 - També s’ha utilitzat **Bootstrap**, una llibreria de clases i ID’s ja predefinides que ens ha agilitzat la feina a la hora de crear estils diferents dintre del projecte.
 - Finalment, s'ha afegit un altre paquet extern, anomenat **FontAwsome.** Aquest paquet ens permet utilitzar unes icones per el nostre projecte en diferents estils, en el projecte s'ha utilitzat l'estil duotone. Hem fet servir la versió 6.1.1. <br>
#### 2.1.2 Capa de lògica (Backend):
- Per desenvolupar aquesta capa hem utilitzat **ASP.NET Core i C#** per tal de tenir una coordinació entre les capes existents. 
- Aquesta capa és **l'unica que interactua amb les dues restants**. Si es conecta a la BBDD, es guarda informació i llavors, passant per la capa de presentacció, imprimeix la informació.
- Es pot considerar doncs, una capa prou important dintre d'aquest projecte ja que durant el procés de reserva, la lògica pesa força. Tot i així no podem dir que és la capa més important, ja que en casos força concrets, no necessita estar en coordinació amb la capa de presentació.
#### 2.1.3 Capa de dades (BBDD):
- Hem utilitzat **SQL Server** juntament amb **Entity Framework Core** per tal de dur a terme una base de dades per el tipus de projecte desenvolupat. SQL Server ens ha facilitat l'interacció amb la BBDD, mentres que Entity Framework Core, a partir d'ara anomenat EF Core, ens ha proporcionat la opció de mapejar taules per fer-les models d'objectes (ORM).
- Com que es treballa amb dades sensibles, com poden ser perfectament les contrasenyes de cada usuari, s’han integrat al projecte i per tant, a la BBDD, tokens. Així doncs, cal deixar clar que les contrasenyes no es guarden mai com un text pla, sino que un cop creat el compte, la contrasenya es transforma en un token. És important recordar que cada usuari tindrà un token únic, protegint així el compte d’usuari i la seguretat del projecte. 
<br><br>
## 3. Components d'Angular: 
<a href="#31-índex">3.1 Índex.</a><br>
<a href="#32-inici-i-registre">3.2 Inici i registre.</a><br>
<a href="#33-pàgina-principal">3.3 Pàgina principal.</a><br>
<a href="#34-barres-de-navegació">3.4 Barres de navegació.</a><br>
<a href="#35-canvi-de-dades-i-perfil">3.5 Canvi de dades i perfil.</a><br>
<a href="#36-paisos-ciutats-oficines-sales">3.6 Paisos, ciutats, oficines i sales.</a><br>
<a href="#37-reserva-i-derivats">3.7 Reserva i derivats.</a><br>
<a href="#38-administrador-i-els-seus-modificadors">3.8 Administrador i els seus modificadors.</a><br>
<a href="#39-crud-de-paisos-ciutats-oficines-sala-i-reserva">3.9 CRUD.</a><br>
<a href="">3.10 Configuració de microserveis.</a><br>
<a href="">3.11 Configuració de moduls i enrutament.</a><br>
### 3.1 Índex:
##### index.component.ts
Com que el projecte es tracta d'una empresa que reserva sales per els seus treballadors, a la portada només podem veure el nom de l'empresa i dos botons. <br>
Tecnologies i biblioteques utilitzades: Dintre d'aquest component s'ha utilitzat Bootstrap en els botons i també en el container del component.  <br>
Funcionalitats principals: Aquest component no té cap funcionalitat ja que com a . <br>
### 3.2 Inici i registre: 
#### 3.2.1 Inici:
##### login.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
#### 3.2.2 Registre:
##### register.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.3 Pàgina principal:
##### home.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.4 Barres de navegació: 
#### 3.4.1 Barra de navegació general:
##### navbar.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### navadmin.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
#### 3.4.2 Barres de navegació utilitzades en situacions especifiques:
##### navprofile.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### navsales.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.5 Canvi de dades i perfil: 
#### 3.5.1 Canvi de dades:
##### dades.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### ubicacio.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### change-user.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### change-email.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### change-password.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
#### 3.5.2 Perfil:
##### profile.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.6 Paisos, ciutats, oficines, sales: 
##### paisos.component.ts ciutats.component.ts oficines.component.ts sales.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.7 Reserva i derivats:
##### fer-reserva.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### select-sala.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### reserves.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### reserva-box.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### reserva-modify.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
<!--AIXO NO SÉ SI POSARHO AL 3.8-->
##### admin-modifyreserves.component.ts 
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### vista-reserva-pais.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### vista-reserva-ciutat.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### vista-reserva-oficina.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.8 Administrador i els seus modificadors: 
##### admin.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### admin-modifyciutats.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### admin-modifyoficines.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### admin-modifypaisos.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.9 CRUD de paisos, ciutats, oficines, sala i reserva: 
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### 3.9.1 CREATE
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### 3.9.2 READ
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### 3.9.3 UPDATE
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### 3.9.4 DELETE
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->

### 3.10 Configuració de microserveis.
##### 3.10.1 Introducció
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### 3.10.2 Serveis
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->

### 3.11 Configuració de moduls i enrutament

##### 3.10.1 app.module.ts
Aquest arxiu és el módul arrel del framework d'Angular. En aquest arxiu s'hi defineixen móduls, components, serveis i altres dependencies que es troben dintre de l'aplicació. <br>

**Funcionalitats principals:** 
 - Implementació de móduls, components i serveis del projecte de l'aplicació d'Angular.
 - S'estableix una lògica global dintre del mateix projecte.
 - Configurar móduls de tercers, com per exemple Angular Material, que s'utilitza en el fer-reserva a l'hora d'escollir la sala.<br>

##### 3.10.2 app-routing.module.ts
Aquest arxiu és on escollirem una ruta de l'entorn del client amb les corresponents vistes de l'aplicació. En definitiva, aquest arxiu no és més que un módul d'enrutament.<br>

**Funcionalitats principals:** 
 - S'enllaçen components i URL's, fent que depenent de la URL, l'usuari vegi un el component A, B, C... Això ens porta directament al següent punt.
 - Ens permet facilitar la navegació entre diferents components.
 - Podem crear rutes anidades i també passant-li parametres. En aquest projecte ho veurem quan passem per el component Paisos. Quan l'usuari vagi fent click als parametres que ell vulgui, veura una ruta similar a aquesta: /oficines/Alemanya/Munic/ACME%20Munich/sales.
## 4. Backend i BBDD:
En aquest apartat veurem la part del backend i la BBDD que son les parts que sostenen el nostre projecte. Puntualitzarem com es gestionen les dades, es podrà veure com es connecten els components i a la vegada, s'asegura la integritat de les dades sensibles dins de la funcionalitat de l'aplicació.<br>

### 4.1 Backend amb C#:
A l'apartat del backend trobem tot allò que no es veu al costat client: rutes, endpoints, maneig de peticions, accés a la BBDD, seguretat i autenticació, maneig d'excepcions, rendiment, serveis addicionals, etc.<br>

### 4.2 WebAPI:
En un principi, aquest projecte era més petit per lo que només teniem un simple projecte amb tot el backend, anomenat WebAPI. A mesura que han anat passant els sprint reviews, ens hem vist amb la necesitat d'afegir-hi microserveis -punt que explicarem més endavant-. El projecte WebAPI és el monolit principal, tot i que l'idea és dividir-lo per tal de que cada microservei cumpleixi una funcio més especifica.

### 4.3 Microserveis:
Els microserveis no són més que programaris dividits per tal de que aquests tinguin una autonomía. Aquesta utilitat s'ha implementat per tal de que, en el cas de que caigui un servei, per exemple el de ReservesAPI, no es vegi afectat també el servei de UsersAPI. Es a dir, que tots els serveis en la mesura del possible, siguin autònoms i no depenguin dels altres serveis.

##### 4.3.1 APIs generades:
 - GeoLocalitzation
 - ReservesAPI
 - UsersAPI

### 4.3.2 Controladors:
La seva funció principal és fer servir les sol·licituds HTTP que arriben al servidor i coordinar la interacció entre el model de dades, la vista i altres parts de l'aplicació.
### ApplicationUserController.cs
Aquest arxiu conté tots els controladors dedicats als usuaris de l'aplicació.<br>

**GET: UsersAPI/ApplicationUsers**
 - Torna tots els usuaris de la base de dades amb tota la seva informació en format JSON.<br>
 
**GET: UsersAPI/ApplicationUsers/{id}**
 - Torna l'usuari amb la ID que se li passa amb tota la informació en format JSON.<br>
 
**POST: UsersAPI/ApplicationUsers**
 - Es crea o s'actualitza un usuari a la base de dades.<br>

**PUT: UsersAPI/ApplicationUsers/{id}**
 - S'actualitzen diferents paràmetres de l'usuari amb la ID que se li passa.<br>

**DELETE: UsersAPI/ApplicationUsers/{id}**
 - S'esborra l'usuari amb la ID que se li passa de la base de dades.<br>

**GET: UsersAPI/ApplicationUsers/{id}/role**
 - Torna el nom del rol de l'usuari amb la ID que se li passa.<br>

**POST: UsersAPI/ApplicationUsers/ChangePassword**
 - Actualitza la contrasenya d'un usuari. Aquesta contrasenya serà la que l'usuari hagi escrit i confirmat al formulari de la web.<br>

**POST: UsersAPI/ApplicationUsers/ChangeUsername**
 - Actualitza el nom d'usuari d'un usuari. Aquest nom d'usuari serà el que l'usuari hagi escrit i confirmat al formulari de la web.<br>

**POST: api/ApplicationUsers/ChangeEmail**
 - Actualitza el correu d'un usuari. Aquest correu serà el que l'usuari hagi escrit i confirmat al formulari de la web.<br>

**POST: UsersAPI/ApplicationUsers/AssignCountry**
 - Assigna un país a un usuari. Aquest país serà el que l'usuari hagi seleccionat a la web.<br>

**POST: UsersAPI/ApplicationUsers/AssignCity**
 - Assigna una ciutat a un usuari. Aquesta ciutat serà la que l'usuari hagi seleccionat a la web, filtrada pel país que hagi seleccionat anteriorment.<br>

**POST: UsersAPI/ApplicationUsers/AssignOffice**
 - Assigna una oficina a un usuari. Aquesta oficina serà la que l'usuari hagi seleccionat a la web, filtrada pel país i ciutat que hagi seleccionat anteriorment.<br>

**POST: UsersAPI/ApplicationUsers/{username}/UploadProfileImage**
 - Puja o actualitza a la base de dades la imatge de perfil d'un usuari. Aquesta imatge es guarda com a tipus image. Si l'usuari no ha pujat cap imatge anteriorment s'estableix una per defecte.<br>

**GET: UsersAPI/ApplicationUsers/GetProfileImage/{username}**
 - Torna la imatge del nom d'usuari que se li passa.<br>
 
### AuthController.cs
Aquest arxiu conté tots els controladors dedicats a l'autentificació de l'aplicació, fent referencia als tokens.<br>

### PaisController.cs
Aquest arxiu conté tots els controladors dedicats als paisos de l'aplicació.<br>

**GET: api/GetPais**
 - Torna tots els paisos de la base de dades amb tota la seva informació en format JSON.<br>

**GET: GeoLocalitzation/GetPais/{id}** 
 - Torna la informació del país amb la ID que se li introdueix, en format JSON.<br>

 **POST: GeoLocalitzation/CreatePais**
 - Crea un nou país dintre de la BBDD. <br>

  **PUT: GeoLocalitzation/UpdatePais/{id}**
 - Actualitza la informació d'un país amb l'ID que l'usuari ha introduit.<br>

 **DELETE: GeoLocalitzation/DeletePais/{id}**
 - El métode elimina el país amb la ID introduida per l'usuari.<br>

**DELETE: GeoLocalitzation/DeletePais/{nomPais}**
 - El métode elimina el país que tingui el mateix nom introduit per l'usuari.<br>
 
 **GET: GeoLocalitzation/PaisExists/{id}**
 - Aquest métode privat comprova que el país amb ID introduida existeix a la BBDD.<br>

### CiutatsController.cs
Aquest arxiu conté tots els controladors dedicats a les ciutats de l'aplicació.<br>

**GET: GeoLocalitzation/GetCiutats**
 - Torna totes les ciutats de la base de dades amb tota la seva informació en format JSON.<br>

**GET: GeoLocalitzation/GetCiutats/{id}** 
 - Torna la informació de la ciutat amb la ID que se li introdueix, en format JSON.<br>

 **GET: GeoLocalitzation/GetCiutatsByPais/{nomPais}** 
 - Torna la informació de totes les ciutats enllaçades amb el país introduit. Ho torna en format JSON.<br>

 **POST: GeoLocalitzation/CreateCiutats/{nomCiutat}**
 - Crea una nova ciutat dintre de la BBDD. <br>

 **POST: GeoLocalitzation/CreateCiutatsByName/{nomPais, nomCiutat}**
 - Crea una nova ciutat relacionada ja amb país dintre de la BBDD. <br>

  **PUT: GeoLocalitzation/UpdateCiutat/{cityId}**
 - Actualitza la informació de una ciutat amb l'ID que l'usuari ha introduit.<br>

 **DELETE: GeoLocalitzation/DeleteCiutats/{id}**
 - El métode elimina la ciutat amb la ID introduida per l'usuari.<br>

**DELETE: api/DeleteCiutatsByNom/{nomCiutat}**
 - El métode elimina la ciutat que tingui el mateix nom introduit per l'usuari.<br>
 
 **GET: GeoLocalitzation/CiutatsExists/{id}**
 - Aquest métode privat comprova que la ciutat amb ID introduida existeix a la BBDD.<br>

### OficinesController.cs
Aquest arxiu conté tots els controladors dedicats a les oficines de l'aplicació.<br>

**GET: GeoLocalitzation/GetOficines**
 - Torna tots els paisos de la base de dades amb tota la seva informació en format JSON.<br>

**GET: GeoLocalitzation/GetOficina/{id}** 
 - Torna la informació del país amb la ID que se li introdueix, en format JSON.<br>

**GET: GeoLocalitzation/GetGeolocationByOficinaId/{id}**
- Lorem ipsum. <br>

 **POST: GeoLocalitzation/CreateOficina**
 - Crea un nou país dintre de la BBDD. <br>

  **POST: GeoLocalitzation/CreateOficinesByNom/{nomOficina}**
 - Crea un nou país dintre de la BBDD. <br>

  **PUT: GeoLocalitzation/UpdateOficina/{id}**
 - Actualitza la informació d'un país amb l'ID que l'usuari ha introduit.<br>

 **DELETE: GeoLocalitzation/DeleteOficina/{id}**
 - El métode elimina el país amb la ID introduida per l'usuari.<br>

**DELETE: GeoLocalitzation/DeleteOficinesByNom/{nomOficina}**
 - El métode elimina el país que tingui el mateix nom introduit per l'usuari.<br>
 
 **GET: GeoLocalitzation/OficinaExists/{id}**
 - Aquest métode privat comprova que el país amb ID introduida existeix a la BBDD.<br>

### SalesController.cs
Aquest arxiu conté tots els controladors dedicats a les sales de l'aplicació.<br>

**GET: ReservesAPI/GetSales**
 - Torna totes les sales de la base de dades amb tota la seva informació en format JSON.<br>

**GET: ReservesAPI/GetSala/{id}** 
 - Torna la informació de la sala amb la ID que se li introdueix, en format JSON.<br>

**POST: ReservesAPI/CreateSales**
 - Crea una nova sala de reunions utilitzant el nom de país, ciutat i oficina. <br>

**POST: ReservesAPI/CreateSalesByNom/{id}**
 - Crea una nova sala de reunions utilitzant el nom de país, ciutat i oficina. <br>

**PUT: ReservesAPI/UpdateSales/{id}**
 - Actualitza la sala desitjada a través del ID que l'usuari li introdueixi. Retorna el codi 204 si l'operació s'ha realitzat amb éxit.<br>

**DELETE: ReservesAPI/DeleteSales/{id}**
 - El métode elimina la sala de reunions amb la ID introduida per l'usuari.<br>

**DELETE: ReservesAPI/DeleteSalesByNom/{nomSala}**
 - El métode elimina la sala de reunions amb el nom de la sala introduit per l'usuari.<br>

**GET: ReservesAPI/SalesExists/{id}**
 - Aquest métode privat comprova que la sala de reunions amb la ID introduida, existeix a la BBDD.<br>
 
### ReservesController.cs
Aquest arxiu conté tots els controladors dedicats a les reserves de l'aplicació.<br>

**GET: ReservesAPI/GetReserves**
 - Torna totes les reserves de la base de dades amb tota la seva informació en format JSON.<br>

**GET: ReservesAPI/GetReserve/{id}** 
 - Torna la informació de la reserva amb la ID que se li introdueix, en format JSON.<br>

**POST: ReservesAPI/CreateReservations**
 - Crea una nova reserva utilitzant el nom de país, ciutat i oficina. <br>

**PUT: ReservesAPI/UpdateReserve/{id}**
 - Crea o actualitza una reserva utilitzant el nom de país, ciutat i oficina. <br>

**GET: ReservesAPI/GetReservesByUser/{userId}**
 - Torna la informació de la reserva amb la UserID que se li introdueix, en format JSON.<br>

**DELETE: ReservesAPI/DeleteReserve/{id}**
 - El métode elimina la reunió amb la ID introduida per l'usuari.<br>

**GET: ReservesAPI/ReserveExists/{id}**
 - Aquest métode privat comprova que la reunió amb la ID introduida existeix a la BBDD.<br>
### 4.2.3 Models:
Lorem ipsum. <br>
### RegisterModel.cs
Lorem ipsum. 
 - **Username** (string, nullable): La variable que registrarà el nom del futur usuari. 
 - **Email** (string, nullable): La variable que guardarà el correu electronic del usuari.
 - **Password** (string, nullable): Aquesta variable guardarà més endavant la contrasenya del usuari.<br>
### LoginModel.cs
Lorem ipsum.<br>
 - **Username** (string, nullable): Lorem ipsum.
 - **Email** (string, nullable): Lorem ipsum.<br>
 - **RememberMe** (bool): Lorem ipsum.<br>
### ApplicationUser.cs
Lorem ipsum.<br>
 - **Rol** (string): Lorem ipsum.<br>
### AssignCountry.cs
Lorem ipsum.<br>
 - **Username** (string): Lorem ipsum.
 - **Country** (string): Lorem ipsum.<br>
### AssignCity.cs
Lorem ipsum.<br>
 - **Username** (string): Lorem ipsum.
 - **City** (string): Lorem ipsum.<br>
 ### AssignOffice.cs
Lorem ipsum.<br>
 - **Username** (string): Lorem ipsum.
 - **Office** (string): Lorem ipsum.<br>
 ### ChangeEmail.cs
Lorem ipsum.<br>
 - **Email** (string): Lorem ipsum.
 - **NewEmail** (string): Lorem ipsum.<br>
 ### ChangePassword.cs
Lorem ipsum.<br>
 - **Username** (string): Lorem ipsum.
 - **CurrentPassword** (string): Lorem ipsum.
 - **NewPassword** (string): Lorem ipsum.<br>
 ### ChangeUsername.cs
Lorem ipsum.<br>
 - **CurrentUsername** (string): Lorem ipsum.
 - **NewUsername** (string): Lorem ipsum.<br>
 ### Pais.cs
Lorem ipsum.<br>
 - **CountryID** (int): Lorem ipsum.
 - **NomPais** (string, nullable): Lorem ipsum.<br>
 ### Ciutats.cs
Lorem ipsum.<br>
 - **CityID** (int): Lorem ipsum.
 - **NomCiutat** (string, nullable): Lorem ipsum.
 - **CountryID** (int): Lorem ipsum.
 - **Pais** (Pais): Lorem ipsum.<br>
 ### Oficines.cs
Lorem ipsum.<br>
 - **OfficeID** (int): Lorem ipsum.
 - **NomOficina** (string, nullable): Lorem ipsum.
 - **CityID** (int): Lorem ipsum.
 - **Ciutat** (Ciutats): Lorem ipsum.<br>
 ### Sales.cs
Lorem ipsum.<br>
 - **MeetingRoomID** (int): Lorem ipsum.
 - **NomSala** (string, nullable): Lorem ipsum.
 - **OfficeID** (int): Lorem ipsum.
 - **Capacitat** (int): Lorem ipsum.<br>
 ### Reserves.cs
Lorem ipsum.<br>
 - **ReserveID** (int): Lorem ipsum.
 - **MeetingRoomID** (int): Lorem ipsum.
 - **DataReserva** (DateTime, nullable): Lorem ipsum.
 - **HoraInici** (TimeSpan, nullable): Lorem ipsum.
 - **HoraFi** (TimeSpan, nullable): Lorem ipsum.
 - **UserID** (string): Lorem ipsum.
 - **User** (IdentityUser): Lorem ipsum.<br>
 - **Sala** (Sales): Lorem ipsum.<br>
### 4.5 BBDD SQL Server:
La base de dades SQL Server és un component clau en la arquitectura d'aquest projecte, ja que gestiona i guarda les dades utilitzades a l'aplicació. Aquestes dades inclouen informació sobre les ciutats, reserves, etc. En aquest apartat, a més, podrem apreciar millor sobre les relacions entre les taules, indicant les claus exteriors, anomenades foreign key. <br>
### Estructura de BBDD:
##### dbo.AspNetUser
**Id -  nvarchar(450):** Aquesta és la clau primaria de cada un dels usuaris. Recordem que al ser una clau primaria doncs, serà unica per cada usuari. <br> 
**UserName -  nvarchar(256):** Nom que passarà per la capa de lógica i també per la capa de la presentació, mostrant-se per exemple, en el navbar.  <br> 
**PasswordHash -  nvarchar(MAX):** [PENDENT] <br>
**Email -  nvarchar(256):** Correu electronic que s'utilitzarà més endavant.  <br> 
**Rol - bit:** Aquesta clau és la que determina com veurà diversos components el usuari ja que podrà o no, accedir o no a diversos components de la pàgina web.<br> 
**Pais -  nvarchar(30):** Identificador que es guarda per determinar **el país** on el usuari treballa.<br> 
**Ciutat -  nvarchar(30):** Identificador que es guarda per determinar **la ciutat** on el usuari treballa.<br> 
**Oficina -  nvarchar(30):** Identificador que es guarda per determinar **la oficina** on el usuari treballa.<br> 
**ProfileImage -  image:** Dada que es mostrarà a l'entorn client quan l'usuari vulgui visualitzar el seu perfil. Aquesta dada es tracta d'una imatge, per tant s'ha tingut que guardar com a tal perquè llavor es pugui descodificar al component d'Angular pertinent, en aquest cas: **profile.component.ts**<br> 
##### dbo.Pais
**CountryID -  int:** És la clau primaria de la taula dbo.Pais.<br>
**NomPais - varchar(30):** Nom del país. Aquest valor un límit de 30 caràcters.<br>
##### dbo.Ciutats
**CityID -  int:** La clau primaria de la taula dbo.Ciutats.<br>
**NomCiutat - varchar(30):** Nom de la ciutat. Aquest valor un límit de 30 caràcters.<br>
**CountryID - FOREIGN KEY de [dbo.Pais] - int:** Identificador del país.<br>
##### dbo.Oficines
**OfficeID -  int:** És la clau primaria de la taula dbo.Office.<br>
**NomOficina - varchar(30):** Nom de la oficina en la que trobarem la sala. Aquest valor un límit de 30 caràcters.<br>
**CityID - FOREIGN KEY de [dbo.Ciutat] - int:** Identificador de la ciutat.<br>
##### dbo.Sales
**MeetingRoomID -  int:** La clau primaria de la taula dbo.Sales.<br>
**NomSala - varchar(30):** Nom de la sala que es reserva. Aquest valor un límit de 30 caràcters.<br>
**OfficeID - FOREIGN KEY de [dbo.Oficines] - int:** Identificador de la oficina.<br>
##### dbo.Reserves
**ReserveID -  int:** És la clau primaria de la taula dbo.Reserves.<br>
**DataReserva -  date:** Data en la que es durà a lloc la reunió a la sala pertinent.<br>
**HoraInici -  time:** Hora d'inici de la reserva.<br>
**HoraFi -  time:** Hora de finalització de la reserva.<br>
**UserID - FOREIGN KEY de [dbo.AspNetCore.Users] - nvarchar(450):** Identificador del usuari, propietari d'aquesta reunió.<br>
**MeetingRoomID - FOREIGN KEY de [dbo.Sales] - int:** Identificador de la sala.<br>
<br>
## 5. Configuració i requisits:
En aquesta secció entrarem en detall en quant a les configuracions de cada apartat del projecte, entorn servidor i entorn client a més dels requisits essencials per compilar i executar correctament la nostra aplicació. S'inclou també informació sobre les versions utilitzades en els paquets a més d'informació detallada sobre el software i les configuracions necessàries.<br>
### 5.1 Configuració d'entorn servidor:
Lorem ipsum.<br>
#### 5.1.1 Configuració del projecte C#:
Lorem ipsum.<br>
#### 5.1.2 Configuració de BBDD:
Lorem ipsum.<br>
#### 5.1.3 Configuració de microserveis:
Lorem ipsum.<br>
### 5.2 Configuració d'entorn client:
Lorem ipsum.<br>
#### 5.2.1 Configuració d'Angular:
Lorem ipsum.<br>
### 5.3 Versions i actualitzacions:
Lorem ipsum.<br><br>
## 6. Us i exemples:
Lorem ipsum.
<br><br>
## 7. Proves:
Lorem ipsum.
<br><br>
## 8. Desplegament:
Lorem ipsum.
<br><br>
## 9. Manteniment:
Lorem ipsum.
<br><br>
## 10. Referencies:
Lorem ipsum.
<br><br>
## 11. Anexos:
Lorem ipsum.
<br><br>
