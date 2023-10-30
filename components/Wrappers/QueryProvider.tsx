"use client"
import {QueryClientProvider} from "@tanstack/react-query";
import React, {ReactNode, useState} from "react";
import {QueryClient} from "@tanstack/query-core";



interface IQueryProvider {
    children : ReactNode
}

export const QueryProvider : React.FC<IQueryProvider> = ({children}) => {
    const [client] = useState(new QueryClient({
        defaultOptions : {
            queries : {
                retry : 0,
                refetchOnWindowFocus : false
            }
        }
    }));
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};
