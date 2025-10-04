# Sistema de Gestión Bancaria

Sistema web de gestión bancaria desarrollado con JavaScript que permite a los usuarios crear y administrar cuentas de ahorro y corriente, realizar transacciones y consultar movimientos.

## Características Principales

- Registro y autenticación de usuarios
- Creación de cuentas de ahorro y corriente
- Gestión de cuentas de ahorro y corriente
- Operaciones bancarias: depósitos, retiros y transferencias
- Consulta de saldo y historial de transacciones
- Actualización de datos personales y contraseña
- Persistencia de datos con LocalStorage

## Tecnologías Utilizadas

- **JavaScript ES6+**: Módulos, clases, arrow functions
- **HTML5**: Estructura semántica
- **CSS3**: Estilos y diseño responsive
- **LocalStorage**: Persistencia de datos del lado del cliente
- **SessionStorage**: Gestión de sesiones de usuario

## Arquitectura del Proyecto

### Estructura de Clases

```
User
├── Gestión de datos personales
├── Actualización de contraseña
└── Validación de credenciales

Account (Clase Base)
├── Generación de IDs y números de cuenta
├── Registro de transacciones
└── Visualización de movimientos
    ├── SavingAccount (Cuenta de Ahorros)
    │   ├── Interés mensual: 1%
    │   ├── Sin sobregiro
    │   └── Saldo mínimo: $0
    └── CurrentAccount (Cuenta Corriente)
        ├── Sin interés
        ├── Sobregiro: $500,000
        └── Saldo mínimo: -$500,000
```

### Organización de Archivos

```
proyecto/
├── index.html                  # Página de login
├── transactions.html           # Página principal de transacciones
├── css/
│   └── styles.css             # Estilos globales
└── js/
    ├── main.js                # Punto de entrada, inicialización
    ├── login.js               # Lógica de autenticación
    ├── register.js            # Registro de nuevos usuarios
    ├── user.js                # Clase User
    ├── accounts.js            # Clase Account (base)
    ├── accountsaving.js       # Clase SavingAccount
    ├── accountcurrent.js      # Clase CurrentAccount
    ├── createNewAccount.js    # Creación de cuentas
    ├── userPage.js            # Gestión de página de usuario
    ├── check_balance.js       # Consulta de saldo
    ├── check_transactions.js  # Historial de transacciones
    ├── processDeposit.js      # Procesamiento de depósitos
    ├── processWithdrawal.js   # Procesamiento de retiros
    ├── processTransfer.js     # Procesamiento de transferencias
    └── updateuserdata.js      # Actualización de datos
```

## Modelo de Datos

### LocalStorage

El sistema utiliza tres estructuras JSON en LocalStorage:

#### 1. users.json
```json
{
  "user_id": 1,
  "user_username": "johndoe",
  "user_fname": "John",
  "user_lname": "Doe",
  "user_address": "Calle 123 #45-67",
  "user_documentid": "1234567890",
  "user_password": "password123"
}
```

#### 2. users_accounts.json
```json
{
  "account_id": 1,
  "account_accountnumber": "SA-1234567890",
  "account_userid": 1,
  "account_currentbalance": 1000000
}
```

#### 3. accounts_transactions.json
```json
{
  "transac_id": 1,
  "transac_userid": 1,
  "transac_accountid": 1,
  "transac_transactype": "Consignación",
  "transac_value": 500000,
  "transac_balance": 1500000,
  "transac_timedate": "1/10/2025, 10:30:45"
}
```

### SessionStorage

```json
{
  "loggedIn": "true",
  "userID": "1"
}
```

## Funcionalidades Detalladas

### 1. Autenticación

- **Login**: Validación de usuario y contraseña
- **Intentos fallidos**: Máximo 3 intentos, bloqueo por 24 horas
- **Registro**: Validación de campos con requisitos mínimos
- **Sesión**: Gestión con SessionStorage

### 2. Tipos de Cuenta

#### Cuenta de Ahorros (SA)
- Formato: `SA-XXXXXXXXXX` (10 dígitos)
- Interés mensual: 1%
- No permite sobregiro
- Saldo mínimo: $0

#### Cuenta Corriente (CA)
- Formato: `CA-XXXXXXXXXX` (10 dígitos)
- Sin interés
- Sobregiro permitido: $500,000
- Saldo mínimo: -$500,000

### 3. Transacciones

#### Depósitos (Consignación)
- Monto mayor a cero
- Actualización inmediata de saldo
- Registro en historial

#### Retiros
- Validación de saldo disponible
- Cuenta de ahorros: No permite saldo negativo
- Cuenta corriente: Permite hasta el sobregiro

#### Transferencias
- Validación de cuenta destino
- Verificación de saldo suficiente
- Prevención de auto-transferencias
- Registro en ambas cuentas (envío y recepción)

### 4. Consultas

- **Saldo actual**: Visualización en formato de moneda
- **Historial de transacciones**: Tabla con todos los movimientos
- **Diferenciación visual**: Verde para créditos, rojo para débitos

### 5. Gestión de Usuario

- Actualización de nombre, apellido y dirección
- Cambio de contraseña con validación
- Validación de contraseña actual

## Validaciones Implementadas

### Registro de Usuario

| Campo | Validación |
|-------|-----------|
| Username | Mínimo 5 caracteres, único en el sistema |
| Documento | Mínimo 7 dígitos, único en el sistema |
| Nombre | Mínimo 2 caracteres |
| Apellido | Mínimo 2 caracteres |
| Dirección | Mínimo 10 caracteres |
| Contraseña | Mínimo 4 caracteres |

### Transacciones

- Montos deben ser mayores a cero
- Formato monetario automático
- Validación de cuenta destino en transferencias
- Verificación de saldo disponible
- Prevención de operaciones sin fondos suficientes

## Funciones Auxiliares Principales

### currencyFormat(textNumber)
Formatea números a formato USD con separadores de miles y manejo de decimales.

```javascript
currencyFormat(1234567.89) // "$1,234,567.89"
```

### generateAccountNumber()
Genera número de cuenta único de 10 dígitos con prefijo SA/CA.

```javascript
// SavingAccount
generateAccountNumber() // "SA-4523678901"

// CurrentAccount
generateAccountNumber() // "CA-7891234560"
```

### generateAccountID()
Asigna ID único secuencial incremental.

### generateTransactionID()
Genera ID único para cada transacción.

### registerTransaction(newBalance, transactionType, amount, accountId)
Registra transacción en LocalStorage con timestamp y actualiza saldo.

### viewTransactions()
Renderiza tabla HTML con historial de movimientos, aplicando estilos visuales según el tipo de transacción.

## Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere servidor backend
- No requiere instalación de dependencias

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
git clone https://github.com/usuario/sistema-bancario.git
cd sistema-bancario
```

2. **Abrir en el navegador**
```bash
# Abrir index.html directamente en el navegador
# o usar un servidor local como Live Server
```

3. **Usar la aplicación**
- Registrar un nuevo usuario
- Iniciar sesión
- Crear cuentas de ahorro o corriente
- Realizar transacciones

## Uso del Sistema

### 1. Primer Uso

1. Abrir `index.html`
2. Hacer clic en "Registrarse"
3. Completar formulario de registro
4. Iniciar sesión con las credenciales creadas

### 2. Crear Cuentas

1. En la página de transacciones, ir a "Solicitar Nueva Cuenta"
2. Elegir tipo de cuenta (Ahorro o Corriente)
3. La cuenta se creará automáticamente con saldo inicial de $0

### 3. Realizar Transacciones

1. Seleccionar una cuenta de la lista (radio buttons)
2. Elegir operación del menú:
   - Consultar Saldo
   - Realizar Depósito
   - Realizar Retiro
   - Transferir
   - Ver Movimientos
3. Completar los campos requeridos
4. Confirmar la operación

### 4. Actualizar Datos

1. Ir a "Actualizar Datos Personales"
2. Elegir entre:
   - Actualizar información personal
   - Cambiar contraseña
3. Completar formulario
4. Confirmar cambios

## Características de Seguridad

### Autenticación
- Límite de 3 intentos de login
- Bloqueo temporal tras intentos fallidos
- Validación de contraseñas

### Validaciones de Negocio
- Verificación de saldo antes de operaciones
- Validación de cuentas destino
- Control de sobregiro en cuentas corrientes
- Prevención de auto-transferencias

### Protección de Datos
- Datos almacenados localmente
- Sesión controlada con SessionStorage
- Redirección automática si no hay sesión válida

## Patrones de Diseño Utilizados

### 1. Programación Orientada a Objetos (POO)
- Encapsulación de datos y métodos
- Herencia de clases (Account → SavingAccount/CurrentAccount)
- Polimorfismo en métodos de transacciones

### 2. Patrón Factory
Métodos estáticos para creación de instancias:
```javascript
SavingAccount.createNew(userid, balance)
SavingAccount.existingAccount(accountData)
```

### 3. Module Pattern
Uso de módulos ES6 para organización del código:
```javascript
import Account from "./accounts.js";
export default CurrentAccount;
```

## Limitaciones Conocidas

1. **Almacenamiento Local**: Los datos se pierden si se limpian los datos del navegador
2. **Sin Encriptación**: Las contraseñas se almacenan en texto plano
3. **Sin Backend**: No hay sincronización entre dispositivos
4. **Monousuario**: Solo un usuario puede estar logueado por sesión de navegador
5. **Sin Recuperación**: No hay sistema de recuperación de contraseña

## Mejoras Futuras

- [ ] Implementar backend con base de datos real
- [ ] Encriptación de contraseñas (bcrypt)
- [ ] Sistema de recuperación de contraseña
- [ ] Autenticación de dos factores
- [ ] Exportación de estados de cuenta (PDF)
- [ ] Notificaciones de transacciones
- [ ] Historial de cambios en datos personales
- [ ] Dashboard con gráficos de movimientos
- [ ] Programación de pagos recurrentes
- [ ] Límites de transacción configurables
- [ ] Múltiples divisas
- [ ] API RESTful

## Solución de Problemas

### Los datos desaparecen
**Causa**: LocalStorage fue limpiado
**Solución**: Evitar limpiar datos del navegador o implementar respaldo

### No puedo iniciar sesión
**Causa**: Usuario no registrado o contraseña incorrecta
**Solución**: Verificar credenciales o registrar nuevo usuario

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## Contacto

Nombre del Proyecto: Cajero JS_DOM
Repositorio: [GitHub](https://github.com/KennyFigueroa-UAO/bank_java_dom)

---

**Nota**: Este es un proyecto educativo y de demostración. No debe ser utilizado para gestión bancaria real sin implementar las medidas de seguridad y cumplimiento normativo apropiadas.
