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
## 1. Introducció:<br>
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
 - Per últim, s'ha afegit un altre paquet extern, anomenat **FontAwsome**. Aquest paquet ens permet utilitzar unes icones per el nostre projecte en diferents estils, en el projecte s'ha utilitzat el estil duotone. Hem utilitzat la versió 6.1.1. <br>
#### 2.1.2 Capa de lògica (Backend):
- Per desenvolupar aquesta capa hem utilitzat **ASP.NET Core i C#** per tal de tenir una coordinació entre les capes existents. 
- Aquesta capa és **l'unica que interactua amb les dues restants**. Si es conecta a la BBDD, es guarda informació i llavors, passant per la capa de presentacció, imprimeix la informació.
   #### 2.1.3 Capa de dades (BBDD):
- Es pot considerar doncs, una capa prou important dintre d'aquest projecte ja que durant el procés de reserva, la lògica pesa força. Tot i així no podem dir que és la capa més important, ja que en casos força concrets, no necessita estar en coordinació amb la capa de presentació.<br>
#### 2.1.3 Capa de dades (BBDD):

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
<a href="">3.10 Inici i registre.</a><br>
### 3.1 Índex:
##### index.component.ts
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
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
#### 3.4.2 Barres de navegació utilitzades en components especifics: buscar altre nom
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
#### profile.component.ts
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
##### CREATE
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### READ
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### UPDATE
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
##### DELETE
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
### 3.10 app.module.ts 
<!--
Descripció: Proporciona una discripció del proposit i la funció d'aquest component en la aplicació.<br>
Tecnologies i biblioteques utilitzades: Pensa que has utilitzat bootstrap en la gran part del projecte i FontAwsome.<br>
Funcionalitats principals: Això depen de quin component, veuras tu per descriure'ho.<br>-->
<br>
## 4. Backend i BBDD:<br>
### 4.1 Backend amb C#:
Lorem ipsum.<br>
### 4.2 BBDD SQL Server:

### 4.2.1 Taules:
##### dbo.AspNetUser
Lorem ipsum.
##### dbo.País
Lorem ipsum.
##### dbo.Ciutats
Lorem ipsum.
##### dbo.Oficines
Lorem ipsum.
##### dbo.Sales
Lorem ipsum.
##### dbo.Reserves
Lorem ipsum.
<br><br>
## 5. Configuració i requisits:
Lorem ipsum.
<br><br>
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
