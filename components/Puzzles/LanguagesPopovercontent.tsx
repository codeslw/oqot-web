"use client"
import {Stack} from "@mui/material";
import {languageOptions} from "@/utils/constants";
import {usePathname, useRouter} from "next/navigation";
import {Link} from "@/navigation";
import {useLocale} from  "next-intl"

export const LanguagesPopovercontent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const pathsArray = pathname.split("/");
    const pathsWithoutLocale = pathsArray.slice(2, 100);

    return (
        <Stack spacing={0}>
            {languageOptions.map((item) => {
                return (
                    <Link href={`/${pathsWithoutLocale.join("/")}`}
                          locale={item.key as any}
                          className={"flex space-x-4 rounded-xl p-3 hover:bg-gray-background cursor-pointer min-w-[12rem]"}>
                            <item.Icon className={"rounded-full"}/>
                            <div className="text-base-light">
                                {item.title}
                            </div>
                    </Link>
                );
            })}
        </Stack>
    )
}