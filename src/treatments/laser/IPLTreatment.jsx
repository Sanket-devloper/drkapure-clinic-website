import LaserTreatmentPage from '../../components/LaserTreatmentPage'
import { laserTreatments } from '../../data/laserTreatments'

export default function IPLTreatment() {
	const treatment = laserTreatments.find((item) => item.id === 'ipl-treatment')
	return <LaserTreatmentPage treatment={treatment} />
}
