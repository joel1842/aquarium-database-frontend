import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import TankSizeCalculator from './TankSizeCalculator';
import Footer from '../../components/Bars/Footer';

export const Tank = ({ getSearchTerm }) => {
    return (
        <>
            <StandardNavBar getSearchTerm={getSearchTerm}/>
            <TankSizeCalculator />
            <Footer />
        </>
    );
}
