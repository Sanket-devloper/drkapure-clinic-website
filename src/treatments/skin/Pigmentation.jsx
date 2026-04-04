import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function Pigmentation() {
	const treatment = skinTreatments.find((item) => item.id === 'pigmentation')
	return <SkinTreatmentPage treatment={treatment} />
}
