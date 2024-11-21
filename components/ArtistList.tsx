import React from "react";
import {View, FlatList, TouchableOpacity} from "react-native";
import ArtistBox from "./ArtistBox";
import { Artist } from "@/Types/artist";
import { useRouter } from "expo-router";

export default function ArtistList({artists }: {artists: Artist[]}) {
    const router = useRouter();

    const handlePress = (artists:any) => router.push ({
        pathname : "/ArtistDetailView",
        params: {id: artists.id, name: artists.name, image:artists.image},
    });
    

    return(
        <View>
            <FlatList
                data={artists}
                keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <TouchableOpacity
                    testID={`artist-box-${item.name}`}
                    onPress={() => handlePress(item)}
                >
                    <ArtistBox artist={item} />
                </TouchableOpacity>
            )}
        />
        </View>
    )
}