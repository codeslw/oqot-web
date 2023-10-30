"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import {theme} from "@/styles/theme";




export default function ThemeRegistry({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        // <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        // </NextAppDirEmotionCacheProvider>
    );
}