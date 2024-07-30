# TODO Uygulamasi

## Servisler

### Auth Servis

Auth servis kullanicinin login, register, refreshtoken gibi requestlerini karsilayacak servistir. Kendine ait bir noSQL (Couchbae) database'i vardir. Sadede gateway uzerinden gelen istekleri yanitlar.

#### Data Models

**Todo**:

```ts
interface Todo {
  id: number;
  text: string;
  author: string;
  isCompleted: boolean;
  expireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

**User**:

```ts
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  todos: Todo[];
}
```

#### Endpoints

Her endpoint `/auth` on ekine sahip olmalidir.

- /signup - POST
  - Kullanicidan alinan bilgileri validate eder.
  - Kullanicidan alinan bilgileri database'e kaydeder.
- /signin - POST
  - Kullanici adiyla database'e request atar.
  - Donen datanin parolasiyla kullanicinin girdigi parolayi karsilastirir.
  - Kullanicinin datasiyla birlikte jwt formatinda access ve refresh token doner.
  - Access token'in TLL' i 1 dakikadir.
  - Refres token'in TTL' i yok.
- /refreshtoken - POST

  - Refresh token uzerinden yeni bir access token olusturulup kullaniciya dondurulur.

  ### Todo Servis

  Todo servis todolarin upsert, delete, get gibi crud islemlerini yapan servisimizdir. Sadece gateway uzerinden gelen requestlere yanit verir.

  #### Data Models

**Todo**:

```ts
interface Todo {
  id: number;
  text: string;
  author: string;
  isCompleted: boolean;
  expireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Endpoints

Her enpoint `/todo` on ekine sahib olmalidir.

- / - POST
  - Yenibir todo ekler
  - Mevcut todoyu gunceller
- /:id - DELETE
  - ID' si eslesen todoyu siler
  - Silinen todoyu silinmis todolar table'ina ekler.
- /:id - GET
  - ID ile eslesen todoyu getirir.
- / - GET
  - Butun todolari getirir
- /deleted - POST
  - User'id ye gore silinen tum todolari getirir

### Gateway Servis

Gateway servis gelen requestleri endpointlerindeki on eke gore ilgili servislere yonlendirir. Secure end pointler icin auth middleware ile access token (JWT) offline olarak verify eder.

##### Endpoints

- /auth/\*
  - Authentication Servisine yonlendirilir
- /todo/\*
  - Todo servisine yonlendirilir

### Architecture

![architecture.png](https://uploads.inkdrop.app/attachments/user-28d8bf6ae780f83a9de255b95e12907f/file:4gdazvKbj/index-public)
