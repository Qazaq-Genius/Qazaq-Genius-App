import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { Roboto } from 'next/font/google';
import { SongProps } from '../components/Song';


const SongInfo: React.FC<SongProps> = ({ title_cyr, title_lat, artists, cover_art }) => {
    return <>
        <img src={cover_art} />
    </>;
}

export default SongInfo;
