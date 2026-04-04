import LaserTreatmentPage from '../../components/LaserTreatmentPage'
import { laserTreatments } from '../../data/laserTreatments'

export default function CarbonLaserFacial() {
	const treatment = laserTreatments.find((item) => item.id === 'carbon-laser-facial')
	return <LaserTreatmentPage treatment={treatment} />
}
