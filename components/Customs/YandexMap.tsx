"use client"
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";

export const YandexMap = () => {
    return (<YMaps>
        <Map
            defaultState={{
                center: [55.75, 37.57],
                zoom: 9,
                controls: ["zoomControl", "fullscreenControl"],
            }}
            width={"100%"}
            height={"100%"}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
        >
            <Placemark
                modules={["geoObject.addon.balloon"]}
                defaultGeometry={[55.75, 37.57]}
                properties={{
                    balloonContentBody:
                        "This is balloon loaded by the Yandex.Maps API module system",
                }}
            />
        </Map>
    </YMaps>)
}
