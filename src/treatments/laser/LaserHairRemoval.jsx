import LaserTreatmentPage from '../../components/LaserTreatmentPage'
import { laserTreatments } from '../../data/laserTreatments'

export default function LaserHairRemoval() {
	const treatment = laserTreatments.find((item) => item.id === 'laser-hair-removal')
	return <LaserTreatmentPage treatment={treatment} />
}
