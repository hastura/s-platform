import { redirect } from 'next/navigation'

/** Team review is now part of the consolidated Review page (/competency). */
export default function CompetencyTeamRedirect() {
  redirect('/competency')
}
