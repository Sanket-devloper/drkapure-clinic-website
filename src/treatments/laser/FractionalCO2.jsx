import LaserTreatmentPage from '../../components/LaserTreatmentPage'
import { laserTreatments } from '../../data/laserTreatments'

export default function FractionalCO2() {
	const treatment = laserTreatments.find((item) => item.id === 'fractional-co2')
	return <LaserTreatmentPage treatment={treatment} />
}
