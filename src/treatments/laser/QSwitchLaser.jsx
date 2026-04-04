import LaserTreatmentPage from '../../components/LaserTreatmentPage'
import { laserTreatments } from '../../data/laserTreatments'

export default function QSwitchLaser() {
	const treatment = laserTreatments.find((item) => item.id === 'q-switch-laser')
	return <LaserTreatmentPage treatment={treatment} />
}
