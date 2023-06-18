import React from 'react';
import Image from 'next/image'
import { SongProps } from '../components/Song';


const SongInfo: React.FC<SongProps> = ({ title_cyr, release_date, title_lat, artists, cover_art }) => {
    const formattedReleaseDate = (new Date(Date.parse(release_date))).toLocaleDateString('en-GB');

    return (
        <>
        <div className='flex flex-row items-center flex-nowrap justify-between py-4'>
            <h3 className='mt-0 flex-1'> {/*Title*/}
                <span className='bg-highlight-dark-yellow'> {/*TitleWrapper*/}
                {title_cyr} ({title_lat}) - {artists.map(({ name_cyr }) => name_cyr).join(', ')}
                </span> {/*TitleWrapper*/}
                <div className='text-sm'>Release date {formattedReleaseDate}</div>

            </h3> {/*Title*/}

            <div className="relative h-32 w-32 self-center flex-shrink-0"> {/*Size of the image is specified here*/}
                <Image
                    src={cover_art}
                    alt={`Cover art: ${title_lat}`}
                    fill
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        alignSelf: 'center',
                    }}
                />
            </div>
        </div>
        </>
    );
}

export default SongInfo;
