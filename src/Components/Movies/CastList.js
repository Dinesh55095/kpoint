import React, { useState, useEffect, useMemo } from "react";
import { BASE_URL, API_KEY } from '../../Constants';

import './MovieDetails.css';

function CastList({ selectedMovie }) {
    const [castData, setCastData] = useState([]);
    const [director, setDirector] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        async function getCastList() {
            try {
                const res = await fetch(`${BASE_URL}/movie/${selectedMovie}/credits?${API_KEY}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch cast list');
                }
                const data = await res.json();
                const foundDirector = data.crew.find(member => member.department === "Directing");
                setDirector(foundDirector ? foundDirector.name : 'Name not found');
                setCastData(data.cast);
            } catch (error) {
                console.error('Error fetching cast list:', error);
            }
        }
        getCastList();
    }, [selectedMovie]);

    const shortList = useMemo(() => castData.map(actor => actor.name).join(', ').split(' ').slice(0, 20).join(' '), [castData]);
    const hasMore = useMemo(() => castData.map(actor => actor.name).join(' ').split(' ').length > 20, [castData]);

    return (
        <>
            <p><strong>Director:</strong> {director}</p>
            <p><span><strong>Starring: </strong></span>
                {isExpanded ? (
                    castData.map(actor => actor.name).join(', ')
                ) : (
                    <>
                        {shortList}
                        {hasMore && (
                            <span className="expand-text-link" onClick={() => setIsExpanded(true)}>... Read More</span>
                        )}
                    </>
                )}
                {isExpanded && (
                    <span className="expand-text-link" onClick={() => setIsExpanded(false)}> Read Less</span>
                )}
            </p>
        </>
    );
}

export default CastList;
