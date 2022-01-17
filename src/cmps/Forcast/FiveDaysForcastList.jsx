import FadeIn from 'react-fade-in';
import FiveDaysForcastPreview from './FiveDaysForcastPreview';

export default function FiveDaysForcastList({ fiveDaysWeather, isDayForcast, currUnit }) {
    return (
        <FadeIn className="forcast-list-container flex justify-sb">
            {fiveDaysWeather.forcast.map(day =>
                <FiveDaysForcastPreview key={day.time + Math.random(100000000)} day={day} isDayForcast={isDayForcast} currUnit={currUnit} />
            )}
        </FadeIn>
    )
}
