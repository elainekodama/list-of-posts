import { ApiService } from "@/services/ApiService";
import Constants from "expo-constants";
import { createContext } from "react";

// Should put in environment file
const baseUrl = 'http://0.0.0.0:3000';

export const ServiceContext = createContext({
    apiService: new ApiService(baseUrl)
});