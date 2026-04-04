import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function LowLightLaserTreatment() {
	const treatment = hairTreatments.find((item) => item.id === 'low-light-laser-treatment')
	return <HairTreatmentPage treatment={treatment} />
}
