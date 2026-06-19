import { Link } from "react-router";

interface MemberCardProps {
  member: any;
  basePath: string;
}

export function MemberCard({ member, basePath }: MemberCardProps) {
  const name = member.displayName || member.name || member.id || "Student";
  const image = member.photoUrl || "";

  return (
    <Link
      to={`${basePath}/${member.id}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
      style={{
        background: "rgba(18,18,18,0.85)",
        border: "1px solid rgba(212,175,55,0.15)",
      }}
    >
      <div className="aspect-square overflow-hidden bg-neutral-900">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-white">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-4 text-center">
        <h3
          className="text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name}
        </h3>

        {member.platform && (
          <p
            className="text-sm mt-1"
            style={{ color: "#D4AF37" }}
          >
            {member.platform}
          </p>
        )}

        <div
          className="mt-3 py-2 text-xs rounded"
          style={{
            background: "rgba(212,175,55,0.12)",
            color: "#D4AF37",
          }}
        >
          VIEW PROFILE
        </div>
      </div>
    </Link>
  );
}