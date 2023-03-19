import * as React from 'react'
import useSWR from 'swr'

export interface StudentDetailProps {
  userId: string
}
const MILISECOND_PER_HOUR = 60 * 60 * 1000
export function StudentDetail({ userId }: StudentDetailProps) {
  const { data, error, mutate, isLoading } = useSWR(`/user/${userId}`, {
    revalidateOnFocus: true,
    // dedupingInteval: MILISECOND_PER_HOUR,
    dedupingInteval: 2000,
  })
  function handleMutateCLick() {
    mutate(
      { data: { username: 'tam' } },
      true
    ) /**ung dung show du lieu tam trong luc update, add... */
  }
  return (
    <div>
      <p>
        Name: {data?.data.username || '--'}
        <button onClick={handleMutateCLick}>Mutate</button>
      </p>
    </div>
  )
}
