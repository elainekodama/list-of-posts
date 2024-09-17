import { ApiService } from "@/services/ApiService";
import { createContext } from "react";

// Should put in environment file
const baseUrl = 'http://localhost:3000';

export const ServiceContext = createContext({
    apiService: new ApiService(baseUrl)
});