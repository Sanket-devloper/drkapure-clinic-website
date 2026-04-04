import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function MicroNeedling() {
	const treatment = hairTreatments.find((item) => item.id === 'micro-needling')
	return <HairTreatmentPage treatment={treatment} />
}
