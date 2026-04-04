import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function VampireFacial() {
	const treatment = skinTreatments.find((item) => item.id === 'vampire-facial')
	return <SkinTreatmentPage treatment={treatment} />
}
