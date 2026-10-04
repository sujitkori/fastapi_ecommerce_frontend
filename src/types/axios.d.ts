import "axios";
import type { Waypoints } from "lucide-react";

declare module "axios" {
    export interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}



// NOTE: Axios already has 
// interface InternalAxiosRequestConfig {
//     url?: string;
//     method?: string;
//     headers?: ...
// }

// If we simply write 
// export interface InternalAxiosRequestConfig {
//     _retry?: boolean;
// }

// then it's like creating a new interface, which we don't want. 
// that's why we extend the existing InternalAxiosRequestConfig and add _retry manually



// NOTE: We can write the file name as, axios.types.ts
// that's a normal TypeScript module.

// But for module augmentation, we want TypeScript to treat the file as a declaration file that extends Axios's existing types.

// That's why: src/types/axios.d.ts 
// is the conventional choice.

// File	Purpose
// product.types.ts	Your application's product types
// auth.types.ts	Your application's auth types
// axios.types.ts	Your application's own Axios-related types
// axios.d.ts	Extend/augment Axios's existing TypeScript definitions


// declare module "axios" {
//   interface InternalAxiosRequestConfig {
//     _retry?: boolean;
//   }
// }

// isn't really defining a new application type.

// We're saying:

// "Axios already has this type called InternalAxiosRequestConfig. I want to add something to it."

// That's module augmentation, and .d.ts communicates that purpose clearly.


// NOTE: We don't have to import axios.d.ts file in apiClient.ts file.
// So the connection is automatic. You don't manually connect the file to _retry;
// module augmentation changes the type that error.config already uses.