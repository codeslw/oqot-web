"use client"
import {Placemark, YMaps, Map, GeolocationControl} from "@pbe/react-yandex-maps";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {observer} from "mobx-react-lite";




interface IYandexMap {
    handleAddressChange?: (address: string, isSearch : boolean) => void;
    handlePickAddressFromMap?: (coords: number[]) => void;
    handlePickAddressFromSearch?: (coords : number[]) => void;
    coords?: number[];
    isStatic?: boolean;
}

export const YandexMap : React.FC<IYandexMap> = observer(({handleAddressChange, coords, handlePickAddressFromMap, handlePickAddressFromSearch, isStatic}) => {

    const mapRef : any = useRef(null);

    const changeCords = (e : any) => {
        const coordinates = e.get('coords');
        formattedMapAdressFun(coordinates)
    }

    useEffect(() => {
        if(coords?.length){
            formattedMapAdressFun(coords);
        }
    }, [coords]);

    const formattedMapAdressFun = (coords : any) => {

        if(handlePickAddressFromMap){
            handlePickAddressFromMap(coords)
        }
        mapRef?.current?.panTo(coords)

        axios
            .get(`https://geocode-maps.yandex.ru/1.x/`, {
                params: {
                    geocode: `${coords?.[1]},${coords?.[0]}`,
                    apikey: "033ff716-ddae-4ee8-ae1e-d98fab53b3dc",
                    format: "json",
                    spn: `${coords?.[1]},${coords?.[0]}`,
                },
            })

            .then(
                ({
                     data: {
                         response: { GeoObjectCollection },
                     },
                 }) => {
                    const location = GeoObjectCollection.featureMember.find(
                        (data: any, index: number) => index === 0
                    );

                    const formattedData =
                        location.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.slice(
                            3
                        )
                            .map((item: any) => item.name)
                            .join(",");

                   // setFormatedAddress(formattedData);
                    if(handleAddressChange){
                        handleAddressChange(formattedData, false);
                    }
                    //  setSearching(false)

                }
            );
    }


    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (res) => {
                    const coordsArray = [res.coords.latitude, res.coords.longitude];
                    formattedMapAdressFun(coordsArray);

                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            navigator.permissions.query({ name: "geolocation" }).then(res => {
                if (res.state === "granted") {
                    // if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (res) => {
                            const coordsArray = [res.coords.latitude, res.coords.longitude];
                            formattedMapAdressFun(coordsArray);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                    // }
                }

            })
        }

    };

    return (<YMaps>
        <Map
            defaultState={{
                center: coords,
                zoom: 14,

                controls: ["zoomControl", "fullscreenControl"],
            }}
            width={"100%"}
            height={"100%"}
            onClick={isStatic ? changeCords : undefined}
            instanceRef={mapRef}
            modules={["control.ZoomControl", "control.FullscreenControl", "control.GeolocationControl"]}
        >
            <Placemark
                geometry={coords}
                options={{
                    iconLayout: "default#image",
                    iconImageHref: "/icons/placemark.svg",
                    iconImageSize: [40, 40],
                    iconImageOffset: [-20, -20],
                }}
            />
            <GeolocationControl
                height={32}
                width={32}
                onClick={getUserLocation}
                options={{position : {
                right : 25,
                bottom : 20
                } }} />
        </Map>
    </YMaps>)
})
