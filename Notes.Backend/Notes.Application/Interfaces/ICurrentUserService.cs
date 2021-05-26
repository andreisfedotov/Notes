using System;

namespace Notes.Application.Interfaces
{
    public interface ICurrentUserService
    {
        Guid UserId { get; }
    }
}
